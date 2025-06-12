import { useEffect, useState } from 'react';
import axios from 'axios'

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJournalist, setSelectedJournalist] = useState('');

  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/categories');
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }

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

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        <button
          onClick={() => {
            {/*export const getAllArticles = (req, res) => {
                  const { journalistId, categoryId } = req.query;

                  let filteredArticles = articles;

                  if (journalistId) {
                      filteredArticles = filteredArticles.filter(
                      (a) => a.journalistId == journalistId
                      );
                  }

                  if (categoryId) {
                      filteredArticles = filteredArticles.filter(
                      (a) => a.categoryId == categoryId
                      );
                  }

                  res.status(200).json({
                      success: true,
                      data: filteredArticles,
                      count: filteredArticles.length
                  });
              }; */}
            axios.get(`http://localhost:3000/articles?journalistId=${selectedJournalist}&categoryId=${selectedCategory}`)
            .then(res => setArticles(res.data.data));
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            setSelectedJournalist('');
            setSelectedCategory('');
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