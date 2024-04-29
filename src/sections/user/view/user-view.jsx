import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRouter } from 'src/routes/hooks';

// import { users } from 'src/_mock/user';

import Scrollbar from 'src/components/scrollbar';

// import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
// import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
// import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [artCount, setArtCount] = useState();
  const [article, setArticle] = useState([]);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState();

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      router.push('/login');
    } else {
      const fetchArticles = async () => {
        const res = await fetch('https://api.realworld.io/api/articles');
        console.log(res);
        if (res.ok) {
          const data = await res.json();
          const { articles, articlesCount } = data;
          console.log('dd', data);
          console.log('da', articles);
          console.log('db', articlesCount);
          setArticle(articles);
          setArtCount(articlesCount);
          console.log('a', articles);
          console.log('a', artCount);
        }
      };
      fetchArticles();
    }
  }, [artCount, router]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = article.map((n) => n.title);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // const dataFiltered = applyFilter({
  //   inputData: article,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack> */}
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          All Posts
        </Typography>
      </Container>
      <Card>
        <UserTableToolbar
          numSelected={selected?.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        {article && (
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={artCount > 0 ? artCount : 10}
                  numSelected={selected?.length}
                  onRequestSort={handleSort}
                  headLabel={[
                    { id: 'id', label: '#' },
                    { id: 'Title', label: 'Title' },
                    { id: 'Author', label: 'Author' },
                    { id: 'Tags', label: 'Tags' },
                    { id: 'body', label: 'Excerpt', align: 'center' },
                    { id: 'Created', label: 'Created' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {article?.map((row, index) => (
                    <UserTableRow
                      key={index}
                      id={index}
                      title={row.title.slice(0, 20)}
                      author={row.author.username}
                      tags={row.tagList.map((t) => `${t} `)}
                      body={row.body.slice(0, 20)}
                      created={row.createdAt.slice(0, 10)}
                      selected={selected?.indexOf(row.title) !== -1}
                      handleClick={(event) => handleClick(event, row.title)}
                    />
                  ))}

                  {/* <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, article.length)}
                /> */}

                  {/* {notFound && <TableNoData query={filterName} />} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        )}
        <TablePagination
          page={page}
          component="div"
          count={artCount}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
