import React from "react";

export default function ResponseListItem({ response }) {
  const { user, answers } = response;
  return (
    <>
      <tbody>
        <tr>
          <td className="text-primary">{user.email}</td>
          {Object.entries(answers).map(([question, answer]) => (
            <td key={question}>{answer}</td>
          ))}
        </tr>
      </tbody>
    </>
  );
}
