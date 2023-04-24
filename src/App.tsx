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
    loadSavedProjects()
  }, []);

  async function loadSavedProjects(token?: string){
    if (token) {
      const savedProjects = (await axiosApi.get('project',{ headers: {
        Authorization: `Bearer ${token}`
      } })).data;
      if (savedProjects) {
        setProjects(savedProjects);
      }
    } else {
      const savedProjects = (await axiosApi.get('project')).data;
      if (savedProjects) {
        setProjects(savedProjects);
      }
    }
  }

  async function addProject(project:IProject) {
    await axiosApi.post('project', project);
    loadSavedProjects();
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
    const userLoggedIn = await axiosAuthApi.post('auth/login', { username, password }).catch(() => {
      return
    });
    if (userLoggedIn) {
      localStorage.setItem(LOCAL_STORAGE_KEY, userLoggedIn.data.access_token);
      localStorage.setItem('name', userLoggedIn.data.name);
      setLoggedIn(true);
      await loadSavedProjects(userLoggedIn.data.access_token);
    }
  }

  function signOut() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setLoggedIn(false);
  }

  if(loggedIn === false) {
    return (
      <>
        <Login onLogin={signIn}/>
      </>
    )
  }
  return (
    <>
    <Header onAddProject={addProject} onLogout={signOut} />
    <Projects
      projects={projects}
      handleDeleteProject={removeProject}
      handleCompleteProject={completeProject}
    />
    </>
  )
}

export default App
