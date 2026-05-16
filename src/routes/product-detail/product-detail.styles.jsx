import styled from 'styled-components';

export const ProductDetailContainer = styled.div`
  width: 80%;
  margin: 32px auto;
  display: grid;
  grid-template-columns: minmax(280px, 420px) 1fr;
  gap: 32px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 520px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProductName = styled.h2`
  margin: 0;
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
`;

export const ProductMeta = styled.p`
  color: #666;
  margin: 0;
`;

export const NotFoundMessage = styled.p`
  margin: 32px auto;
  width: 80%;
  font-size: 18px;
`;
