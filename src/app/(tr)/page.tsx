import Site, { metadata as makeMetadata } from '../site';
export const metadata = makeMetadata('tr');
export default function Page() { return <Site lang="tr"/>; }
