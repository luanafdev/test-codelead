import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api';
import axios from 'axios';
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

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
    justify-content: space-between;

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
  const [posts, setPosts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const DeleteModal = ({ isOpen, onClose, onConfirm, postTitle }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '16px',
        width: '500px'
      }}>
        <h2 style={{ marginTop: 0 }}>Are you sure you want to delete this item?</h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '16px',
          marginTop: '24px'
        }}>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid #999',
              borderRadius: '8px',
              padding: '8px 32px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            style={{
              background: '#FF5151',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 32px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
    const EditModal = ({ isOpen, onClose, post, onSave }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '16px',
        width: '500px'
      }}>
        <h2 style={{ marginTop: 0 }}>Edit item</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}
          />
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '16px'
        }}>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid #999',
              borderRadius: '8px',
              padding: '8px 32px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave({ title, content })}
            disabled={!title.trim() || !content.trim()}
            style={{
              background: '#7695EC',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 32px',
              cursor: 'pointer',
              opacity: (!title.trim() || !content.trim()) ? 0.5 : 1
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
const handleDeleteClick = (post) => {
  setPostToDelete(post);
  setDeleteModalOpen(true);
};

const handleEditClick = (post) => {
  setPostToEdit(post);
  setEditModalOpen(true);
};

const confirmDelete = async () => {
  try {
    await axios.delete(`/api/posts/${postToDelete.id}/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    setPosts(posts.filter(post => post.id !== postToDelete.id));
    setDeleteModalOpen(false);
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

const saveEdit = async (updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/posts/${postToEdit.id}/`,
      updatedData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );
    
    setPosts(posts.map(post => 
      post.id === postToEdit.id ? response.data : post
    ));
    setEditModalOpen(false);
  } catch (error) {
    console.error('Error updating post:', error);
  }
};
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [postToEdit, setPostToEdit] = useState(null);

  const createPost = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/posts/create/', {
        title,
        content,
        username: localStorage.getItem('username') || 'anonymous'
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      // Atualiza a lista de posts com o novo post vindo da API
      setPosts([response.data, ...posts]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Erro ao criar post:', error.response?.data);
      setError(error.response?.data?.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts');
      }
    };
    fetchPosts();
  }, []);

  const isFormValid = title.trim() !== '' && content.trim() !== '';

  return (
    <div style={{ backgroundColor: '#DDDDDD', margin: 0, padding: 0 }}>
        <DeleteModal
      isOpen={deleteModalOpen}
      onClose={() => setDeleteModalOpen(false)}
      onConfirm={confirmDelete}
      postTitle={postToDelete?.title}
    />
    
    <EditModal
      isOpen={editModalOpen}
      onClose={() => setEditModalOpen(false)}
      post={postToEdit}
      onSave={saveEdit}
    />

      <AppContainer>  
        <Header>
          <h1>CodeLeap Network</h1>
        </Header>
        
        <MainContent>
          <CreatePostSection>
            <h2>What's on your mind?</h2>
            <form onSubmit={createPost}>
              <FormGroup>
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Hello world"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isSubmitting}
                />
              </FormGroup>
              
              <FormGroup>
                <label>Content</label>
                <textarea
                  placeholder="Content here"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={isSubmitting}
                ></textarea>
              </FormGroup>
              
              {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
              
              <FormActions>
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create'}
                </Button>
              </FormActions>
            </form>
          </CreatePostSection>
          
          <PostsList>
            {posts.map(post => (
              <Post key={post.id}>
                <PostHeader>
                  <h3>{post.title}</h3>
                  <>
                    {post.username == localStorage.getItem('username') && (
                        
                       <div style={{ display: 'flex', gap: '16px', marginRight: '16px' }}>
                            <BsTrash 
                                onClick={() => handleDeleteClick(post)}
                                style={{ cursor: 'pointer', fontSize: "20px", color: "white" }} 
                            />
                            <FaEdit 
                                onClick={() => handleEditClick(post)}
                                style={{ cursor: 'pointer', fontSize: "20px", color: "white" }} 
                            />
                        </div>
                    )}
                  </>
                </PostHeader>
                <PostContent>
                  <PostMeta>
                    <span className="author">@{post.username}</span>
                    <span className="time">{post.time_ago || 'just now'}</span>
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
    </div>
  );
}

export default App;