
import Nav from '@/resource/components/nav';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
    <>
      <Nav />
      {children}
    
    </>
      
      
    
  );
}
