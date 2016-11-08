<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <body>
  <h2>XML + XSL Format</h2>
    <table border="0" cellspacing="1">
      <tr>
        <th>標 題</th>
        <th>專 輯</th>
        <th>國 家</th>
        <th>公 司</th>
        <th>售 價</th>
        <th>年 份</th>
      </tr>
      <xsl:for-each select="catalog/cd">
      <tr>
        <td><xsl:value-of select="title"/></td>
        <td><xsl:value-of select="artist"/></td>
        <td>
			<input type="text">
				<xsl:attribute name="value">
					<xsl:value-of select="country"/>
				</xsl:attribute>
			</input> 
		</td>
        <td><xsl:value-of select="company"/></td>
        <td>
			<input type="text">
				<xsl:attribute name="value">
					<xsl:value-of select="price"/>
				</xsl:attribute>
			</input> 
		</td>
        <td><xsl:value-of select="year"/></td>
      </tr>
      </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>