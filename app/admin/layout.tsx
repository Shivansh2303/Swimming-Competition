import Header from "@/components/admin/header";

export default function PageLayout({ children }: { readonly children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                {children}
            </div>
        </div>
    );
}
