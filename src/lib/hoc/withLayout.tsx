import type { NextPage } from "next";
import React, { ComponentType, FunctionComponent, PropsWithChildren } from "react";

import { Layout } from "@components/layout/Layout";

export type LayoutKind = FunctionComponent<PropsWithChildren<unknown>>;
export type PageWithLayout<P = unknown> = NextPage<P> & {
    layout: ComponentType<PropsWithChildren<unknown>>;
};

export const DEFAULT_LAYOUT: LayoutKind = ({ children }) => <Layout>{children}</Layout>;
export const WITHOUT_BRANDING: LayoutKind = ({ children }) => <Layout branding={false}>{children}</Layout>;
export const NO_LAYOUT: LayoutKind = ({ children }) => <>{children}</>;

export default function withLayout<P>(layout: LayoutKind, page: NextPage<P>): PageWithLayout<P> {
    const pageWithLayout = page as PageWithLayout<P>;
    pageWithLayout.layout = layout;
    return pageWithLayout;
}
