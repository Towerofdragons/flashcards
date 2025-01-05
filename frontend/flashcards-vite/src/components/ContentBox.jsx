import React from "react";
import { cn } from "@/lib/utils";

const ContentBox = ({
    children,
    className,
    title,
    elevated = false,
  }) => {
    return (
      <div
        className={cn(
          "w-full bg-white rounded-lg p-6 transition-all duration-300",
          "border border-gray-100",
          "my-5",
          elevated
            ? "shadow-lg hover:shadow-xl"
            : "shadow-sm hover:shadow-md",
          className
        )}
      >
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        )}
        <div className="text-gray-600">{children}</div>
      </div>
    );
  };
  
  export default ContentBox;