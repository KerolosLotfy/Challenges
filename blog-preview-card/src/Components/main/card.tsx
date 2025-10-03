import { useEffect, useState } from "react";
import type { DevToApiResponse, DevToArticle } from "../fetch/types";
import illustrationArticle from "../../assets/images/illustration-article.svg";
import imageAvatar from "../../assets/images/image-avatar.webp";



export const Card = ({ articles }: { articles: DevToApiResponse | undefined }) => {
    let [article, setArticle] = useState<undefined | DevToArticle>()

    useEffect(() => {
        if (articles) {
            let randomIndex = Math.round(Math.random() * articles.length)
            let radomArticle = articles[randomIndex]
            setArticle(radomArticle)
        }
    }, [articles])

    return (
        <>
            <main>
                <div className="image">
                    <img src={article ? article.social_image as string : illustrationArticle} alt="illustration" />
                </div>

                <div className="content">
                    <div className="tags">
                        {article ?
                            article.tag_list.map((tag, i) => (<p className="category" key={i}>{tag}</p>))
                            : <p className="category">Learning</p>}
                    </div>

                    <p className="publish-date">
                        Published
                        <span className="mx-2">
                            {article
                                ? new Date(article.published_at).toLocaleDateString(undefined, { dateStyle: "medium" })
                                : '21 Dec 2023'}
                        </span>
                    </p>

                    <h1 className="title">
                        <a href={article ? article.url : ""} target="_blank">{article ? article.title : 'HTML & CSS foundations'}</a>
                    </h1>

                    <p className="desc">
                        {article
                            ? article.description
                            : 'These languages are the backbone of every website, defining structure, content, and presentation.'
                        }
                    </p>
                </div>

                <div className="author">
                    <img src={article ? article.user.profile_image_90 : imageAvatar} alt="avatar" />
                    <a href={article ? article.user.website_url as string : ""} className="name">{article ? article.user.name : 'Greg Hooper'}</a>
                </div>
            </main>




            <Attribution />
        </>


    )
}


const Attribution = () => {
    return (
        <div className="attribution">
            <p>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener">Frontend
                Mentor</a>.</p>
            <p>Coded by <a href="https://github.com/KerolosLotfy/" target="_blank" rel="noopener">Kerolos Lotfy</a>.</p>
        </div>
    )
}