import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from './courses/LandingPage';
import { CourseViewer } from './courses/CourseViewer';
import { aiConfig } from './courses/ai';
import { pythonProConfig } from './courses/python_pro';

type CourseType = 'ai' | 'python_pro' | null;

export const App: React.FC = () => {
  const [currentCourse, setCurrentCourse] = useState<CourseType>(() => {
    return (localStorage.getItem('currentCourse') as CourseType) || null;
  });

  const updateCourse = (course: CourseType) => {
    setCurrentCourse(course);
    if (course) {
      localStorage.setItem('currentCourse', course);
    } else {
      localStorage.removeItem('currentCourse');
    }
  };

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
            <LandingPage onSelectCourse={(course) => updateCourse(course)} />
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
              onBack={() => updateCourse(null)}
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
              onBack={() => updateCourse(null)}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default App;
