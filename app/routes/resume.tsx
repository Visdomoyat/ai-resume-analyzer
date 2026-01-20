import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';



export const meta = () => ([
    { title: 'Resumind | Review' },
    { name: 'description', content: 'Detailed overview of your resume' },
])


const Resume = () => {
    const {auth, isLoading, fs, kv} = usePuterStore();
    const { id } = useParams();
    const [imageURL, setImageURL] = useState('');
    const [resumeURL, setResumeURL] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    useEffect (() => {
        const loadResume = async () => {
             const resume = await kv.get(`resume:${id}`);

             if(!resume) return;

             const data = JSON.parse(resume)

             const resumeBlob = await fs.read(data.resumePath);
             if(!resumeBlob) return;

             const pdfBlob = new Blob([resumeBlob], {type: 'application/pdf'});
             const resumeUrl = URL.createObjectURL(pdfBlob);
             setResumeURL(resumeUrl);

             const imageBlob = await fs.read(data.imagePath);
             if(!imageBlob) return;

             const imageUrl = URL.createObjectURL(imageBlob);
             setImageURL(imageUrl);

             setFeedback(data.feedback);


        }

        loadResume();
    }, [id])

    return (
        <main className="resume-nav">
            <nav className="resume-nav">
                <Link to ="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semi-bold">Back to Homepage</span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg: flex-col-reverse">
                <section className="feedback-section ">
                   {imageURL && resumeURL && (

                    <div className="animate-in fade-in duration-1000 graident-border max-sm: m-0 h-[90%] max-wxl:h-fit w-fit">
                        
                    </div>
                   )}
                </section>

            </div>
        </main>
    )
}

export default Resume