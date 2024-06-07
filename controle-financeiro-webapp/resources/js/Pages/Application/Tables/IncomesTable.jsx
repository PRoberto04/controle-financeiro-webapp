import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import '../../../../css/tableStyles.css';

const IncomesTable = () => {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchIncomes = async () => {// busca as rendas
      try {
        const response = await fetch('/rendas'); //requisição para trazer dados do controller
        if (!response.ok) {
          throw new Error('Erro ao buscar as rendas');
        }
        const data = await response.json(); //extraindo dados do json
        setIncomes(data.incomes); // Atualize o estado com os dados das rendas
      } catch (error) {
        console.error('Erro ao buscar as rendas:', error);
      }
    };

    // Chame a função para buscar as despesas quando o componente for montado
    fetchIncomes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await Inertia.delete(`/dashboard/renda/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao excluir a renda');
      }
      setIncomes(incomes.filter(income => income.id !== id));
    } catch (error) {
      console.error('Erro ao excluir a renda:', error);
    }
  };

  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Fonte</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {incomes.map((income) => (
          <tr key={income.id}>
            <td>{income.sourceOfIncome}</td>
            <td>{income.incomeValue.toFixed(2)}</td>
            <td>{income.payDay || '-'}</td>
            <td>
              <button onClick={() => handleDelete(income.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default IncomesTable;