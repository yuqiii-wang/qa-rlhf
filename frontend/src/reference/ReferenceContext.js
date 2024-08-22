import React, { createContext, useState } from 'react';

// Create a context
const ReferenceContext = createContext();


function ReferenceContextManager({ children }) {
    const [codeRows, setCodeRows] = useState([
        { id: 1, code: "# A solution's summary and logs will show here." },
      ]);

    return (
      <ReferenceContext.Provider value={{ codeRows, setCodeRows
                                        }}>
        {children}
      </ReferenceContext.Provider>
    );
  }


export {ReferenceContext, ReferenceContextManager};
