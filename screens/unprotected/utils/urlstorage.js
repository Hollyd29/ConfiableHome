export const url = "https://comfiable-homes.onrender.com/api/v1";

function jhjyfd() {
  return (
    <View>
      <Image source={{ uri: each.image }} />
      <View></View>
      <Text>{each.name}</Text>
      <Text>$ {each.price}</Text>

      {!isGettingProduct && newData.length === 0 ? (
        <Text>No Product Available</Text>
      ) : (
        newData.map((each) => {
          return (
            <View key={each.id}>
              <Image source={{ uri: each.image }} />
              <View>
                <Text>{each.name}</Text>
                <Text>$ {each.Price}</Text>
              </View>
            </View>
          );
        })
      )}
    </View>
  );
}
