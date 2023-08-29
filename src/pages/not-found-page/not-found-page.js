import NotFoundImg from '../../images/404.png';
import Header from '../../components/header/header';

export default function NotFoundPage() {
    return (
        <div>
            <Header />
            <div>
                <img src={NotFoundImg} alt='Page not found' />
            </div>
        </div>
    )
}