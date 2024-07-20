export async function GET(request){
  const pins = [1122, 1133, 1144, 1155];
  return new Response(JSON.stringify(pins));
}