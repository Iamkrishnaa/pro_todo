import React from "react";
import TodosSection from "./TodosSection";
import TodoDescription from "./TodoDescription";
import ThemeToggler from "../common/ThemeToggler";

export default function TodosPage() {
  return (
    <div className="container relative h-screen w-screen">
      <div className="flex flex-col md:flex-row">
        <div className="todos simple-border-color m-4 h-auto w-full flex-1 rounded-lg border-[1px] px-6 py-8">
          <TodosSection />
        </div>
        <div className="todos-details simple-border-color m-4 h-min w-full rounded-lg border-[1px] px-6 py-8 md:w-[330px]">
          <TodoDescription />
        </div>
      </div>

      {/* Theme Toggler */}
      <div className="fixed bottom-8 right-8">
        <ThemeToggler position="top-left" />
      </div>
    </div>
  );
}
