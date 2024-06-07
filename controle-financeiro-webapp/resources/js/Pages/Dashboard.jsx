import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IncomeForm from '@/Pages/Application/IncomeForm';
import ExpenseForm from '@/Pages/Application/ExpenseForm';
import IncomesTable from '@/Pages/Application/Tables/IncomesTable';
import ExpensesTable from "@/Pages/Application/Tables/ExpensesTable";
import '../../css/tableStyles.css'
import '../../css/formStyles.css'


export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="form-container-me">
                            <h2>Adicionar Renda</h2>
                            <IncomeForm />
                        </div>

                        <div className="table-wrapper">
                            <IncomesTable />
                        </div>

                        <div className="form-container-me">
                            <h2>Adicionar Despesa</h2>
                            <ExpenseForm />
                        </div>

                        <div className="table-wrapper">
                            <ExpensesTable />
                        </div>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}