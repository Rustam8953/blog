import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../../components/Post';
import {TagsBlock} from '../../components/TagsBlock';
import {CommentsBlock} from '../../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../../redux/slices/post';

export const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const {posts, tags} = useSelector(state => state.posts);

    const isPostLoading = posts.status === 'loading';
    const isTagsLoading = tags.status === 'loading';
    console.log(userData)

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, [])
    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="Новые" />
                <Tab label="Популярные" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                {
                    (isPostLoading ? [...Array(5)] : posts.items).map((obj, index) => {
                        return isPostLoading ? (<Post key={index} isLoading={true} />)
                        :
                        (
                            <Post
                                id={obj._id}
                                title={obj.title}
                                imageUrl={obj.imageUrl}
                                user={obj.author}
                                createdAt={obj.createdAt}
                                viewsCount={obj.viewCount}
                                commentsCount={3}
                                tags={obj.tags}
                                isEditable={userData?._id == obj.author._id}
                            />
                        )
                    })
                }
                </Grid>
                <Grid xs={4} item>
                    <div className="sticky">
                        <TagsBlock items={tags.items} isLoading={isTagsLoading} />
                        <CommentsBlock
                            items={[
                            {
                                user: {
                                fullName: 'Вася Пупкин',
                                avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                fullName: 'Иван Иванов',
                                avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                            ]}
                            isLoading={false}
                        />
                    </div>
                </Grid>

            </Grid>
        </>
    )
}