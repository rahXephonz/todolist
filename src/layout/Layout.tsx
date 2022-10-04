import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="header h-[105px] flex items-center bg-blue">
        <div
          className="container max-w-full w-full mx-auto"
          data-cy="header-background"
        >
          <h2 className="text-2xl text-white font-bold" data-cy="header-title">
            TO DO LIST APP
          </h2>
        </div>
      </div>
      <main className="mx-auto w-full max-w-full main-container">
        {children}
      </main>
    </>
  );
};

export default Layout;
