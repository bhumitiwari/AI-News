import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppShell, Container, Button, Group, Text, Title, Card, Grid,
  Stack, TextInput, Badge, Paper, Modal
} from '@mantine/core';
import "@mantine/core/styles.css";
import './animations.css';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', content: '' });
  const [opened, setOpened] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const [currentTab, setCurrentTab] = useState('Home'); 
  const [deleteArticleId, setDeleteArticleId] = useState(null); 
  const [deleteModalOpened, setDeleteModalOpened] = useState(false); 

 

  useEffect(() => {
    fetchArticles();
  }, []);


  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/articles');
      setArticles(res.data);
      console.log('Fetched Articles:', res.data); 
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };


  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((article) => article.category === selectedCategory);

  const getSummary = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/summary/${id}`);
      console.log('Summary Response:', res.data);
      if (res.data.summary) {
        setSelectedSummary(res.data.summary);
        setOpened(true);
      } else {
        console.log('No summary data available');
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/articles', newArticle);
      setNewArticle({ title: '', content: '' });
      fetchArticles();
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/articles/${id}`);
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

 
  const openDeleteModal = (id) => {
    setDeleteArticleId(id);
    setDeleteModalOpened(true);
  };


  const closeDeleteModal = () => {
    setDeleteArticleId(null);
    setDeleteModalOpened(false);
  };


  const confirmDelete = () => {
    if (deleteArticleId) {
      handleDelete(deleteArticleId);
      closeDeleteModal();
    }
  };
  

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #ddd' }}>
        <Container size="lg" style={{ height: '100%' }}>
          <Group justify="space-between" align="center" style={{ height: '100%' }}>
            <Text size="xl" ff="poppins" fw="800" color="blue">HR Sutra News</Text>
            <Group gap="md">
              <Text
                fw={500}
                ff="poppins"
                size="md"
                c={currentTab === 'Home' ? 'blue' : 'dimmed'}
                style={{ cursor: 'pointer' }}
                onClick={() => setCurrentTab('Home')}
              >
                Home
              </Text>
              <Text
                fw={500}
                ff="poppins"
                size="md"
                c={currentTab === 'Admin' ? 'blue' : 'dimmed'}
                style={{ cursor: 'pointer' }}
                onClick={() => setCurrentTab('Admin')}
              >
                Admin
              </Text>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl">
     
          {currentTab === 'Home' && (
           <Group justify="center" gap="sm" mb="md" wrap="wrap" align="center">

              {['All', 'Tech Law', 'Data Privacy', 'Cybersecurity', 'Governance', 'Regulation','Legal Reform','AI Policy','Intellectual Property'].map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'filled' : 'light'}
                  color={selectedCategory === cat ? 'blue' : 'gray'}
                  radius="lg"
                  size="sm"
                  ff="poppins"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </Group>
          )}

          
          {currentTab === 'Home' && selectedCategory !== 'Admin' && (
            <>
              <Grid gutter="lg">
                {filteredArticles.map((article) => (
                  
                  <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={article.id} className="article-card">
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <Paper
                      h={200}
                      bg="gray.2"
                      mb="sm"
                      radius="md"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={article.image_url}
                        alt="Article Image"
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </Paper>
                
                    <Title order={4} mt="sm" ff="poppins">{article.title}</Title>
                    <Group spacing="xs" align="center" mt="xs">
                      <Badge
                        color= 'blue'
                        variant="light"
                        radius="xl"
                        ff="poppins"
                      >
                        {article.category}
                      </Badge>
                      <Text size="xs" ff="poppins" c="dimmed">{new Date(article.published_date).toLocaleDateString()}</Text>
                    </Group>
                
                    <Text size="sm" c="dimmed" mt="md" ff="poppins">
                      {article.content.slice(0, 100)}...
                    </Text>
                
                    <div style={{ flexGrow: 1 }} /> 
                
                    <Group position="apart" mt="md">
                      <Button
                        size="xs"
                        color="blue"
                        onClick={() => getSummary(article.id)}
                        style={{ marginTop: 'auto' }}
                      >
                        View Summary
                      </Button>
                    </Group>
                  </Card>
                </Grid.Col>
                
                ))}
              </Grid>
            </>
          )}

          {currentTab === 'Admin' && (
            <Paper mt="xl" p="lg" radius="md" withBorder>
              <Text size="xl" fw="800" ff="poppins" color="blue"  mb="md">Admin Role</Text>
              <Stack>
                <TextInput
                  label="Title"
              
                  placeholder="Enter article title"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.currentTarget.value })}
                  styles={{ label: { fontFamily: 'poppins' },placeholder: { fontFamily: 'poppins' } }}
                />
                <TextInput
                  label="Content"
                  placeholder="Enter article content"
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.currentTarget.value })}
                />
                <Button onClick={handleAdd} color="teal"> Add Article</Button>
                <Grid gutter="lg" mt="md">
                  {articles.map((article) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={article.id}>
                      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
                        <Title ff="poppins" order={5} mt="sm">{article.title}</Title>
                        <Group position="apart" mt="md">
                          <Button size="xs" color="red" ff="poppins" onClick={() => openDeleteModal(article.id)}>
                            Delete
                          </Button>
                        </Group>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            </Paper>
          )}
        </Container>
      </AppShell.Main>

      <Modal
  opened={opened}
  onClose={() => setOpened(false)}
  title="Full Summary"
  size="lg"
  ff="poppins"
  classNames={{
    root: 'mantine-Modal-root', 
  }}
>
  <Text>{selectedSummary}</Text>
</Modal>


   
      <Modal
      ff="poppins"     
       opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Are you sure?"
        centered
      >
        <Text size="sm">Are you sure you want to delete this article? This action cannot be undone.</Text>
        <Group position="right" mt="md">
          <Button variant="outline" color="gray" onClick={closeDeleteModal}>Cancel</Button>
          <Button color="red" onClick={confirmDelete}>Delete</Button>
        </Group>
      </Modal>
    </AppShell>
  );
}
