import type { NextPage } from "next";

const NotFoundPage: NextPage = () => {
    return (
        <div className="m-auto text-center">
            <h1 className="font-title text-8xl">404</h1>
            <p>The requested page was not found.</p>
        </div>
    );
};

export default NotFoundPage;
