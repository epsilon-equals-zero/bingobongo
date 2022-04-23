import type { NextPage } from "next";

import withAuth, { AuthPageProps } from "@lib/hoc/withAuth";

const NewBingo: NextPage<AuthPageProps> = ({}: AuthPageProps) => {
    return <div>TODO!</div>;
};

export default withAuth(NewBingo);
