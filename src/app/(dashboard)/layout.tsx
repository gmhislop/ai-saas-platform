import NavBar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { getApiLimitCount } from '@/lib/api-limit';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <section className="relative h-full">
      <div className="hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <NavBar />
        {children}
      </main>
    </section>
  );
};

export default DashboardLayout;
