import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import '../../../../css/tableStyles.css';

const ExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {//Busca as despesas
      try {
        const response = await fetch('/despesas'); //requisição para trazer dados do controller
        if (!response.ok) {
          throw new Error('Erro ao buscar as despesas');
        }
        const data = await response.json(); // extraindo dados do json
        setExpenses(data.expenses); // atualiza o estado com os dados das despesas
      } catch (error) {
        console.error('Erro ao buscar as despesas:', error);
      }
    };

    // chama a função de busca quando o componente é montado
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await Inertia.delete(`/dashboard/despesa/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao excluir a despesa');
      }
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Erro ao excluir a despesa:', error);
    }
  };

  return (
    <div className="table-wrapper">
      <table className="table-container">
        <thead>
          <tr>
            <th>Fonte</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.sourceOfExpense}</td>
              <td>{expense.expenseValue.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>{expense.expenseDate || '-'}</td>
              <td>
                <button onClick={() => handleDelete(expense.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;