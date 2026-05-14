import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <div className="min-h-screen  bg-black flex items-center justify-center p-4 sm:p-8">
      {/* 16:10 Container pretending to be the Switch Screen. 
          In a real R3F setup, this would be rendered via Html inside a mesh. 
          Here we mock the container for standalone viewing. */}
      <div className="w-full max-w-[1280px] aspect-[16/10] bg-background relative overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)] rounded-[4px]">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
