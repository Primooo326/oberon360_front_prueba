import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import '@/styles/globals.scss';
import '@/styles/custom.scss';
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            {children}
        </main>
    );
}