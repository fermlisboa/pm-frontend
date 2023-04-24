import { useEffect, useState } from "react";
import { Header } from "./components/Header"
import { Login } from "./components/Login";
import { Projects } from "./components/Projects";
import { axiosApi, axiosAuthApi } from "./utils/utils";

const LOCAL_STORAGE_KEY = 'SaveProjectsToken';

export interface IProject {
  id?: string;
  title: string;
  cost: string;
  zip_code: string;
  deadline: string;
  done?: boolean;
  createdAt?: Date;
}

function App() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
      setLoggedIn(true);
    }
  }, []);

  async function loadSavedProjects() {
  const savedProjects = (await axiosApi.get('project')).data;
   if (savedProjects) {
     setProjects(savedProjects);
   }
  }

  useEffect(() => {
    loadSavedProjects();
  }, [])

  async function setProjectsAndSave(newProjects: IProject[]) {
    setProjects(newProjects);
    await axiosApi.post('project', newProjects);
    loadSavedProjects();
  }

  function addProject(project:IProject) {
    setProjectsAndSave([
      ...projects,
      {
        title: project.title,
        cost: project.cost,
        zip_code: project.zip_code,
        deadline: project.deadline,
      }
    ]);
  }
  
  async function removeProject(id: string) {
    if (confirm('Deseja realmente deletar esse projeto?')) {
      await axiosApi.delete(`project/${id}`);
      loadSavedProjects();
    }
  }

  async function completeProject(id:string) {
    await axiosApi.patch(`project/${id}/done`);
    loadSavedProjects();
  }

  async function signIn(username: string, password: string) {
    const userLoggedIn = await axiosAuthApi.post('auth/login', { username, password });
    localStorage.setItem(LOCAL_STORAGE_KEY, userLoggedIn.data.access_token);
    setLoggedIn(true);
  }

  if(loggedIn == false) {
    return (
      <>
        <Login onLogin={signIn}/>
      </>
    )
  }
  return (
    <>
    <Header onAddProject={addProject} />
    <Projects
      projects={projects}
      handleDeleteProject={removeProject}
      handleCompleteProject={completeProject}
    />
    </>
  )
}

export default App