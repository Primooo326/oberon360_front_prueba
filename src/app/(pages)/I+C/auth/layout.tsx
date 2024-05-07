import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import '@/styles/globals.scss';
import '@/styles/custom.scss';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <ToastContainer />
            {children}
        </main>
    );
}