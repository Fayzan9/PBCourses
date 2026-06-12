import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from './courses/LandingPage';
import { CourseViewer } from './courses/CourseViewer';
import { aiConfig } from './courses/ai';
import { pythonConfig } from './courses/python';
import { pythonProConfig } from './courses/python_pro';
import { javascriptConfig } from './courses/javascript';
import { marathiConfig } from './courses/marathi';

type CourseType = 'ai' | 'python' | 'python_pro' | 'javascript' | 'marathi' | null;

export const App: React.FC = () => {
  const [currentCourse, setCurrentCourse] = useState<CourseType>(null);

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      <AnimatePresence mode="wait">
        {currentCourse === null && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <LandingPage onSelectCourse={(course) => setCurrentCourse(course)} />
          </motion.div>
        )}

        {currentCourse === 'ai' && (
          <motion.div
            key="ai-course"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full h-screen"
          >
            <CourseViewer
              courseName={aiConfig.courseName}
              chapters={aiConfig.chapters}
              themes={aiConfig.themes}
              hasWhiteboard={aiConfig.hasWhiteboard}
              WhiteboardComponent={aiConfig.WhiteboardComponent}
              onBack={() => setCurrentCourse(null)}
            />
          </motion.div>
        )}

        {currentCourse === 'python' && (
          <motion.div
            key="python-course"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full h-screen"
          >
            <CourseViewer
              courseName={pythonConfig.courseName}
              chapters={pythonConfig.chapters}
              themes={pythonConfig.themes}
              hasSandbox={pythonConfig.hasSandbox}
              SandboxComponent={pythonConfig.SandboxComponent}
              hasWhiteboard={pythonConfig.hasWhiteboard}
              WhiteboardComponent={pythonConfig.WhiteboardComponent}
              onBack={() => setCurrentCourse(null)}
            />
          </motion.div>
        )}

        {currentCourse === 'python_pro' && (
          <motion.div
            key="python-pro-course"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full h-screen"
          >
            <CourseViewer
              courseName={pythonProConfig.courseName}
              chapters={pythonProConfig.chapters}
              themes={pythonProConfig.themes}
              hasSandbox={pythonProConfig.hasSandbox}
              SandboxComponent={pythonProConfig.SandboxComponent}
              hasWhiteboard={pythonProConfig.hasWhiteboard}
              WhiteboardComponent={pythonProConfig.WhiteboardComponent}
              onBack={() => setCurrentCourse(null)}
            />
          </motion.div>
        )}

        {currentCourse === 'marathi' && (
          <motion.div
            key="marathi-course"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full h-screen"
          >
            <CourseViewer
              courseName={marathiConfig.courseName}
              chapters={marathiConfig.chapters}
              themes={marathiConfig.themes}
              hasWhiteboard={marathiConfig.hasWhiteboard}
              WhiteboardComponent={marathiConfig.WhiteboardComponent}
              hasLiveAgent={marathiConfig.hasLiveAgent}
              LiveAgentComponent={marathiConfig.LiveAgentComponent}
              onBack={() => setCurrentCourse(null)}
            />
          </motion.div>
        )}

        {currentCourse === 'javascript' && (
          <motion.div
            key="javascript-course"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full h-screen"
          >
            <CourseViewer
              courseName={javascriptConfig.courseName}
              chapters={javascriptConfig.chapters}
              themes={javascriptConfig.themes}
              onBack={() => setCurrentCourse(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
