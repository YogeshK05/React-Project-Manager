import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import { useState } from "react";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectID: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectState((prev) => ({ ...prev, selectedProjectID: null }));
  }

  function handleAddProject(projectData) {
    const newProject = {
      id: Math.random(),
      ...projectData,
    };
    setProjectState((prev) => ({
      ...prev,
      selectedProjectID: undefined,
      projects: [...prev.projects, newProject],
    }));
  }

  function handleAddTask(taskText) {
    const newTask = {
      id: Math.random(),
      text: taskText,
      projectID: projectState.selectedProjectID,
    };
    setProjectState((prev) => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
  }

  function handleClearTask(taskID) {
    setProjectState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== taskID),
    }));
  }

  function handleCancelAddProject() {
    setProjectState((prev) => ({ ...prev, selectedProjectID: undefined }));
  }

  function handleSelectProject(projectID) {
    setProjectState((prev) => ({ ...prev, selectedProjectID: projectID }));
  }

  function handleDeleteProject() {
    setProjectState((prev) => ({
      ...prev,
      selectedProjectID: undefined,
      projects: prev.projects.filter(
        (project) => project.id !== prev.selectedProjectID
      ),
    }));
  }

  let content = (
    <SelectedProject
      project={projectState.projects.find(
        (project) => project.id === projectState.selectedProjectID
      )}
      onDeleteProject={handleDeleteProject}
      tasks={projectState.tasks.filter(
        (task) => task.projectID === projectState.selectedProjectID
      )}
      onAddTask={handleAddTask}
      onClearTask={handleClearTask}
    />
  );
  if (projectState.selectedProjectID === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectID === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectID={projectState.selectedProjectID}
      />
      {content}
    </main>
  );
}

export default App;
