import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Markdown = ({ markdown }: { markdown: string }) => {
  const dark = useSelector((state: RootState) => state.app.dark);

  return (
    <div>
      <ReactMarkdown
        components={{
          code: ({ className, inline, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div>
                <SyntaxHighlighter
                  style={dark ? atomOneDark : atomOneLight}
                  language={match[1]}
                  children={String(children).replace(/\n$/, "")}
                  customStyle={{
                    margin: 0,
                    backgroundColor: dark ? "#0F172A" : "#F1F5F9",
                  }}
                  showLineNumbers
                  {...props}
                />
              </div>
            ) : (
              <code {...props}>{children}</code>
            );
          },
          pre: (props) => {
            return <div className="mb-12" {...props}></div>;
          },
        }}
        children={markdown}
      />
    </div>
  );
};

export default Markdown;
