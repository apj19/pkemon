import React from "react";
import { useState } from "react";
import { allpokemons } from "../utilities/Allpokemos";
import { Combobox } from "@headlessui/react";

function Test2() {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [query, setQuery] = useState("");
  const filteredPeople =
    query === ""
      ? []
      : allpokemons.filter((person) => {
          return person.toLowerCase().startsWith(query.toLowerCase());
        });
  return (
    <div>
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
          className="text-white border border-blue-500 bg-transparent "
        />
        <Combobox.Options className="h-[150px] overflow-y-scroll text-white scrollbar-hide mt-4">
          {filteredPeople.map((person) => (
            <Combobox.Option key={person} value={person}>
              {person}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

export default Test2;
