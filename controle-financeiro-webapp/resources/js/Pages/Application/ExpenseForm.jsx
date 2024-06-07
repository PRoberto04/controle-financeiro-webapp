import React from 'react';
import { useForm } from '@inertiajs/react';

const ExpenseForm = () => {
    const { data, setData, post, processing, errors } = useForm({
        sourceOfExpense: '',
        expenseValue: '',
        category: 'Casa',
        expenseDate: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!data.sourceOfExpense || !data.expenseValue) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        post('/dashboard/despesa', {
            onSuccess: () => {
                reset(); 
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Fonte:
                <input
                    type="text"
                    value={data.sourceOfExpense}
                    onChange={(e) => setData('sourceOfExpense', e.target.value)}
                />
            </label>

            <label>
                Valor:
                <input
                    type="number"
                    value={data.expenseValue}
                    onChange={(e) => setData('expenseValue', e.target.value)}
                />
            </label>

            <label>
                Categoria:
                <select value={data.category} onChange={(e) => setData('category', e.target.value)}>
                    <option value="Casa">Casa</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Alimentação">Alimentação</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Inesperada">Inesperada</option>
                </select>
            </label>

            <label>
                Data (opcional):
                <input type="date" value={data.expenseDate} onChange={(e) => setData('expenseDate', e.target.value)} />
            </label>

            <button type="submit" disabled={processing}>
                Adicionar Despesa
            </button>
            {errors.sourceOfExpense && <div className="error">{errors.sourceOfExpense}</div>}
            {errors.expenseValue && <div className="error">{errors.expenseValue}</div>}
            {errors.category && <div className="error">{errors.category}</div>}
            {errors.expenseDate && <div className="error">{errors.expenseDate}</div>}
        </form>
    );
};

export default ExpenseForm;