import React from 'react';
import { useForm } from '@inertiajs/react';

const IncomeForm = () => {
  const { data, setData, post, processing, errors } = useForm({
    sourceOfIncome: '',
    incomeValue: '',
    payDay: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!data.sourceOfIncome || !data.incomeValue) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    post('/dashboard/renda').then(() => {
      setData({ sourceOfIncome: '', incomeValue: '', payDay: '' });
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Fonte:
        <input
          type="text"
          value={data.sourceOfIncome}
          onChange={(e) => setData('sourceOfIncome', e.target.value)}
        />
      </label>

      <label>
        Valor:
        <input
          type="number"
          value={data.incomeValue}
          onChange={(e) => setData('incomeValue', e.target.value)}
        />
      </label>

      <label>
        Data (opcional):
        <input type="date" value={data.payDay} onChange={(e) => setData('payDay', e.target.value)} />
      </label>

      <button type="submit" disabled={processing}>
        Adicionar Renda
      </button>
      {errors.sourceOfIncome && <div>{errors.sourceOfIncome}</div>}
      {errors.incomeValue && <div>{errors.incomeValue}</div>}
      {errors.payDay && <div>{errors.payDay}</div>}
    </form>
  );
};

export default IncomeForm;