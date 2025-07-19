import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api';

const AppContainer = styled.div`
  max-width: 650px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fffffff9;
  color: #333;
`;

const Header = styled.header`
  background-color: #7695EC;
  color: white;
  padding: 20px;
  
  h1 {
    margin: 0;
    font-size: 22px;
    font-weight: bold;
  }
`;

const MainContent = styled.main`
  margin-top: 20px;
  padding: 20px;
`;

const CreatePostSection = styled.section`
  background-color: white;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #999999;
  
  h2 {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    radius: 16px;
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const FormActions = styled.div`
  text-align: right;
`;

const Button = styled.button`
  background-color: #7695EC;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 120px;
  height: 32px;
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const PostsList = styled.section``;

const Post = styled.article`
  background-color: white;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #999999;

`;

const PostHeader = styled.div`
  margin-bottom: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
  background-color: #7695EC;
  width: 100%;
  border-radius: 8px;
  height: 55px;
  align-items: center;
    display: flex;

  h3 {
    margin: 0;
    margin-left: 20px;
    color: white;
    font-size: 18px;
  }
`;

const PostMeta = styled.div`
justify-content: space-between;
    display: flex;
  color: #777;
  font-size: 14px;
  margin-bottom: 15px;
  .author {
    font-weight: bold;
    margin-right: 10px;
  }
`;

const PostContent = styled.div`
    padding: 20px;
  p {
    margin: 0 0 15px 0;
    line-height: 1.5;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

function App() {
    
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post at CodeLeap Network!",
      author: "@Victor",
      time: "25 minutes ago",
      content: "Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maeceana egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.\n\nDuis lobortis massa imperdiet quam. Aenean poquere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus tacinia erat."
    },
    {
      id: 2,
      title: "My Second Post at CodeLeap Network!",
      author: "@Vini",
      time: "45 minutes ago",
      content: "Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maeceana egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.\n\nDuis lobortis massa imperdiet quam. Aenean poquere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem."
    }
  ]);

    

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts/');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                throw error;
            }
        };
        fetchPosts()
    }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      title: title,
      author: "@You",
      time: "Just now",
      content: content
    };
    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
  };

  const isFormValid = title.trim() !== '' && content.trim() !== '';

  return (
    <>
        
        <body style={{ backgroundColor: '#DDDDDD', margin: 0, padding: 0 }}>
            
        <AppContainer>  
            <Header>
                <h1>CodeLeap Network</h1>
            </Header>
            <MainContent>
                <CreatePostSection>
                <h2>What's on your mind?</h2>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="Hello world"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    </FormGroup>
                    
                    <FormGroup>
                    <label>Content</label>
                    <textarea
                        placeholder="Content here"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    </FormGroup>
                    
                    <FormActions>
                    <Button
                        type="submit"
                        disabled={!isFormValid}
                    >
                        Create
                    </Button>
                    </FormActions>
                </form>
                </CreatePostSection>
                
                <PostsList>
                {posts.map(post => (
                    <Post key={post.id}>
                    <PostHeader>
                        <h3>{post.title}</h3>
                    </PostHeader>
                    <PostContent>
                        <PostMeta>
                            <span className="author">{post.username!}</span>
                            <span className="time">{post.time_ago}</span>
                        </PostMeta>
                        {post.content.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                        ))}
                    </PostContent>
                    </Post>
                ))}
                </PostsList>
        </MainContent>
        </AppContainer>
        </body>
    </>
  );
}

export default App;