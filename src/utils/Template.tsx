import React from "react";
import { Card } from "../components/Card";

const Template = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-gradient-to-br dark:from-blue-900 dark:to-blue-800 from-blue-200 to-blue-100 shadow-none">
          <div>
            <div>Halo,</div>
            <div className="text-xl font-bold mt-px">John</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Template;
