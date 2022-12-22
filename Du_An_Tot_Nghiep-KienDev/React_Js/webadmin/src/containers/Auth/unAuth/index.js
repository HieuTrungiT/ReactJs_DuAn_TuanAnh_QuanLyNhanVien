import './unAuth.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './Navbar';
import { Contact } from './Contact';
import { Banner } from './Banner';
import { Skills } from './Skill';
import { Projects } from './Projects';
import { Footer } from './Footer';

function UnAuth() {
    const Check_Login = localStorage.getItem('Save_Login');
    const Home = JSON.parse(Check_Login);
    {
        Home != null &&
            setTimeout(() => {
                window.location.reload();
            }, 0)
    }


    return (
        <div className='UnAuth_dev'>
            <NavBar />
            <Banner />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </div>
    );
}

export default UnAuth;