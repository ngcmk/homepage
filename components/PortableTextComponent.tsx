import { PortableText } from "@portabletext/react";

const components = {
  types: {
    image: ({ value }: any) => (
      <img
        src={value.asset.url}
        alt={value.alt || "Image"}
        className="my-4 rounded-lg"
      />
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-semibold my-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-semibold my-2">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-semibold my-2">{children}</h4>,
    normal: ({ children }: any) => <p className="text-base leading-7 my-2">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 pl-4 italic my-4">{children}</blockquote>
    ),
  }
};

export default function PortableTextComponent({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}
