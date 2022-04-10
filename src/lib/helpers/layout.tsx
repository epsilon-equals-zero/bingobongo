import React, { ComponentType, PropsWithChildren } from "react";

import { Layout } from "src/components/layout/Layout";

export const DEFAULT_LAYOUT: ComponentType<PropsWithChildren<unknown>> = ({ children }: PropsWithChildren<unknown>) => (
    <Layout showAuthBox={true}>{children}</Layout>
);

export const LAYOUT_WITHOUT_AUTHBOX: ComponentType<PropsWithChildren<unknown>> = ({
    children,
}: PropsWithChildren<unknown>) => <Layout showAuthBox={false}>{children}</Layout>;
export const NO_LAYOUT = ({ children }: PropsWithChildren<unknown>) => <>{children}</>;

export type ComponentTypeWithLayout<P> = ComponentType<P> & {
    _layout: ComponentType<PropsWithChildren<unknown>>;
};

export default function withLayout<P>(
    layout: ComponentType<PropsWithChildren<unknown>>,
    page: ComponentType<P>
): ComponentTypeWithLayout<P> {
    const pageWithLayout = page as ComponentTypeWithLayout<P>;
    pageWithLayout._layout = layout;
    return pageWithLayout;
}
