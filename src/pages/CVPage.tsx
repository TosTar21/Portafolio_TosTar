// CVPage.tsx (un nuevo componente para la ruta /cv)
import React from "react";

const CVPage: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <embed
        src="/Cv.pdf"
        type="application/pdf"
        className="w-full h-full"
      />
    </div>
  );
};

export default CVPage;
