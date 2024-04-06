import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import { Post } from "../../components/Post";
import { CommentsBlock } from "../../components/CommentsBlock";
import axios from "../../redux/axios";

export const PostPage = () => {
    const [dataItem, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        axios.get(`/posts/${id}`)
        .then(res => {
            console.log(res)
            setData(res.data)
            setLoading(false);
        })
        .catch(err => {
            console.warn(err);
            alert("Ошибка при получении данных");
        })
    }, [])

    if(isLoading) {
        return <Post isLoading={isLoading} isFullPost />
    }

    return (
        <>
        <Post
            id={dataItem._id}
            title={dataItem.title}
            imageUrl={dataItem.imageUrl}
            user={dataItem.author}
            createdAt={dataItem.createdAt}
            viewsCount={dataItem.viewCount}
            commentsCount={3}
            tags={dataItem.tags}
            isFullPost
        >
            <p>{dataItem.text}</p>
        </Post>
        <CommentsBlock
            items={[
            {
                user: {
                fullName: "Вася Пупкин",
                avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий 555555",
            },
            {
                user: {
                fullName: "Иван Иванов",
                avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
            },
            ]}
            isLoading={false}
        >
        </CommentsBlock>
        </>
    );
};