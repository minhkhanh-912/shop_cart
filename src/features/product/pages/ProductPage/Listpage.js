import {
  Box,
  Container,
  Grid,
  Pagination,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import productApi from "../../../../api/productApi";
import PreviewFilter from "../../components/PreviewFilter";
import ProductFilters from "../../components/ProductFilters";
import ProductList from "../../components/ProductList";
import ProductSort from "../../components/ProductSort";
import "./index.scss";
const Listpage = () => {
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(true);
  // const [fillter, setfillter] = useState({
  //   _page: 1,
  //   _limit: 13,
  //   _sort: "salePrice:ASC",
  // });
  const location = useLocation();
  const [queryPram, setqueryPram] = useSearchParams();

  const queryPrams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 13,
      _sort: params._sort || "salePrice:ASC",
      // isFreeShip: params.isFreeShip === "true",
      // isPromotion: params.isPromotion === "true",
    };
  }, [location.search]);

  console.log(queryPrams);
  const [pagination, setpagination] = useState({ total: 10, limit: 10 });
  useEffect(() => {
    async function getDate() {
      try {
        const response = await productApi.getAll(queryPrams);
        console.log(response);
        setproduct(response.data);
        setpagination(response.pagination);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    }
    getDate();
  }, [queryPrams]);
  const handlePagination = (event, value) => {
    // setfillter({ ...fillter, _page: value });
    const newPram = { ...queryPrams, _page: value };
    setqueryPram(queryString.stringify(newPram));
  };

  const handleChange = (event, newValue) => {
    // setfillter({ ...fillter, _sort: newValue });
    const newPram = { ...queryPrams, _sort: newValue };
    setqueryPram(queryString.stringify(newPram));
  };

  const handleFillterChange = (newFilter) => {
    // setfillter({ ...fillter, ...newFilter });
    const newPram = { ...queryPrams, ...newFilter };
    setqueryPram(queryString.stringify(newPram));
  };

  const handleNewFilter = (newFilter) => {
    // setfillter(newFilter);
    const newPram = { ...newFilter };
    console.log(newPram);
    setqueryPram(queryString.stringify(newPram));
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className="grid-left">
            <Paper elevation={0}>
              <ProductFilters
                fillter={queryPrams}
                onchange={handleFillterChange}></ProductFilters>
            </Paper>
          </Grid>
          <Grid item className="grid-right">
            <Paper elevation={0}>
              <ProductSort
                value={queryPrams._sort}
                handleChange={handleChange}></ProductSort>
              <PreviewFilter
                fillter={queryPrams}
                onchange={handleNewFilter}></PreviewFilter>
              {loading ? (
                <Box padding={1}>loading....</Box>
              ) : (
                <ProductList data={product}></ProductList>
              )}
              <Pagination
                count={Math.ceil(pagination.total / pagination.limit)}
                page={Number(queryPrams._page) || 1}
                onChange={handlePagination}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Listpage;
