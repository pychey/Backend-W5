import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, [articles]);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:3000/articles');
      setArticles(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/articles/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button onClick={() => deleteArticle(article.id)}>Delete</button>
            <button onClick={() => {
              nav(`/update/${article.id}`)
            }}>Update</button>
            <button onClick={() => {
              nav(`/articles/${article.id}`)
            }}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}