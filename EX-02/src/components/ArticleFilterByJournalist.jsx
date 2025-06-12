import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  const fetchArticles = async () => {
      try {
        const res = await axios.get('http://localhost:3000/articles');
        setArticles(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    const fetchJournalists = async () => {
      try {
        const res = await axios.get('http://localhost:3000/journalists');
        setJournalists(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter" value={selectedJournalist} onChange={(e) => setSelectedJournalist(e.target.value)}>
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map(journalist => (
            <option key={journalist.id} value={journalist.id}>{journalist.name}</option>
          ))}
        </select>

        <button
          onClick={() => {
            axios.get(`http://localhost:3000/journalists/${selectedJournalist}/articles`)
            .then(res => setArticles(res.data.data.articles));
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            setSelectedJournalist('');
            fetchArticles();
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}