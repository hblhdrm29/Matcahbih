import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-cream-dark/20 pt-32 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Hidden on mobile, handled differently or just stacked? 
                        For now, let's stack it on mobile or keep it visible.
                        Ideally mobile has a different nav or the sidebar becomes a top block.
                    */}
                    <aside className="w-full lg:w-80 flex-shrink-0">
                        <div className="lg:sticky lg:top-24">
                            <ProfileSidebar />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
