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
    const [isMainAskDone, setIsMainAskDone] = useState(false);
    const [isSolutionRunning, setIsSolutionRunning] = useState(false);
    const [isSolutionShowDone, setIsSolutionShowDone] = useState(false);
    const [isSolutionRunDone, setIsSolutionRunDone] = useState(false);
    const [isSolutionConcludeDone, setIsSolutionConcludeDone] = useState(false);
    const [isSolutionExecutionDone, setIsSolutionExecutionDone] = useState(false);
    const [referenceCodeSepOffset, setReferenceCodeSepOffset] = useState(0);
    const [solutionId, setSolutionId] = useState(0);

    return (
      <GlobalAppContext.Provider value={{ answerLoading, setAnswerLoading,
                                        solutionLoading, setSolutionLoading,
                                        executionLoading, setExecutionLoading,
                                        summaryResults, setSummaryResults,
                                        referenceResults, setReferenceResults,
                                        referenceImageResults, setReferenceImageResults,
                                        codeResults, setCodeResults,
                                        isMainAskDone, setIsMainAskDone,
                                        isSolutionShowDone, setIsSolutionShowDone,
                                        isSolutionRunning, setIsSolutionRunning,
                                        isSolutionRunDone, setIsSolutionRunDone,
                                        isSolutionConcludeDone, setIsSolutionConcludeDone,
                                        isSolutionExecutionDone, setIsSolutionExecutionDone,
                                        referenceCodeSepOffset, setReferenceCodeSepOffset,
                                        solutionId, setSolutionId
                                        }}>
        {children}
      </GlobalAppContext.Provider>
    );
  }


export {GlobalAppContext, GlobalAppContextManager};
