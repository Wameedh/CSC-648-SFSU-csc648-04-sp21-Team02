import { useState, useEffect } from 'react'
import {Link, useHistory } from "react-router-dom";
import axios from 'axios';

import styles from './Feed.module.css'
import PostModal from '../../components/Modals/PostModal'

import ArrowIcon from '../../images/Created Icons/Arrow.svg'

import DeleteIcon from  '../../images/Created Icons/Exit-Cancel.svg'

import FlagIcon from '../../images/Third Party Icons/icons8-empty-flag.png'

function AdminFeed() {
    const [postModalDisplay, setPostModalDisplay] = useState(false);
    const [adminFeedPosts, setAdminFeedPosts] = useState([]);

    const history = useHistory();

    useEffect(() => {
        console.log('/api/get-admin-feed-posts');
        axios.get('/api/get-admin-feed-posts')
            .then(response => {
                console.log(response.data);
                setAdminFeedPosts(response.data);
            })
            .catch(err => {
                console.log("Error: ");
                console.log(err);
            })
    }, [])

    const [selectedPost, setSelectedPost] = useState({});
    const [createPostOverlayDisplayBool, setCreatePostOverlayDisplayBool] = useState(true);
    const [createPostOverlayDisplay, setCreatePostOverlayDisplay] = useState({
        display: 'grid',
        height: 360
    });

    //for changing submit image button state
    const [attachImageFontColor, setAttachImageFontColor] = useState('#131b49');
    const [attachImageBackgroundColor, setAttachImageBackgroundColor] = useState('#ffffff');
    const [attachImageText, setAttachImageText] = useState('Add Image');
    const [attachImageBorderColor, setAttachImageBorderColor] = useState('#131b49')
    const [attachedImage, setAttachedImage] = useState(false);  //real thing will be null or attached image?

    function openPostModal(feedPost) {
        if (!event) var event = window.event;
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        console.log(feedPost);
        setSelectedPost(feedPost);
        setPostModalDisplay(true);
        return
    }

    function closePostModal() {
        setPostModalDisplay(false);
    }

    function goToProfile(event,profileID){
        console.log()
        //stop from opening post modal
        if (!event) var event = window.event;
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();

        const location = {
            pathname: "/Profile/" + profileID,
          }
          history.push(location);
    }

    function removePost(event,postID){
        if (!event) var event = window.event;
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        
        axios.post('/api/delete-post',{
            postID: postID
        })
        .then(response =>{
            console.log(response)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    return (
        <>
            <div className={styles["follower-feed-container"]}>
                <div className={styles["follower-feed-header"]}></div>

                {adminFeedPosts.length == 0 &&                     
                    <>
                        <div className={styles['follower-feed-no-posts-placeholder-header']}>
                            No Flagged Posts to Show
                        </div>
                        <div className={styles['follower-feed-no-posts-placeholder-detail']}>
                        </div>
                    </>
                }
                {adminFeedPosts && adminFeedPosts.map((adminFeedPost) => (
                    <div className={styles["follower-feed-post"]} onClick={() => openPostModal(adminFeedPost)} >
                        <img className={styles["follower-feed-post-prof_pic"]} src={adminFeedPost.profile_pic_link} onClick={(event) => goToProfile(event,adminFeedPost.profile_id)}/>
                        <div className={styles["follower-feed-post-name"]} onClick={(event) => goToProfile(event,adminFeedPost.profile_id)}>{adminFeedPost.display_name} </div>
                        <div className={styles["follower-feed-post-timestamp"]}>{new Date(adminFeedPost.timestamp).toLocaleString()}</div>
                        <div className={styles["follower-feed-post-admin-flags"]}>
                            <span className={styles["follower-feed-post-flag-count"]}>{adminFeedPost.flag_count}</span>
                            <img className={styles["follower-feed-post-admin-flag-icon"]} src={FlagIcon}/>
                        </div>
                        <span className={styles['follower-feed-post-admin-delete']}  onClick={(event) => removePost(event,adminFeedPost.post_id)}>Delete</span>
                        {/* <div className={styles["follower-feed-post-comments"]}>10 comments</div> */}

                        <div className={styles["follower-feed-post-body"]}>{adminFeedPost.body}</div>
                        <img className={styles["follower-feed-post-pic"]} src={adminFeedPost.link} />
                    </div>
                ))}
            </div>
            <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={selectedPost} />
        </>
    )
}

export default AdminFeed