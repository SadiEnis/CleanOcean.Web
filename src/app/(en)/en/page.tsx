import Site, { metadata as makeMetadata } from '../../site';
export const metadata = makeMetadata('en');
export default function Page() { return <Site lang="en"/>; }
