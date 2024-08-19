import React, { createContext, useState } from 'react';

// Create a context
const GlobalAppContext = createContext();


function GlobalAppContextManager({ children }) {
    const [answerLoading, setAnswerLoading] = useState(false);
    const [solutionLoading, setSolutionLoading] = useState(false);
    const [executionLoading, setExecutionLoading] = useState(false);
    const [summaryResults, setSummaryResults] = useState([]);
    const [referenceResults, setReferenceResults] = useState();
    const [referenceImageResults, setReferenceImageResults] = useState([]);
    const [codeResults, setCodeResults] = useState();

    return (
      <GlobalAppContext.Provider value={{ answerLoading, setAnswerLoading,
                                        solutionLoading, setSolutionLoading,
                                        executionLoading, setExecutionLoading,
                                        summaryResults, setSummaryResults,
                                        referenceResults, setReferenceResults,
                                        referenceImageResults, setReferenceImageResults,
                                        codeResults, setCodeResults
                                        }}>
        {children}
      </GlobalAppContext.Provider>
    );
  }


export {GlobalAppContext, GlobalAppContextManager};
