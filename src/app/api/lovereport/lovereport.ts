export const getLoveReportFields = async () => {
    const response = await fetch(`${process.env.WP_URL}/api/hello_world`, {});
    const data = await response.json();
    const item = data[0].post_content;

    const parsed = JSON.parse(item);
    
    return parsed;
}